package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"encoding/json"
	"encoding/xml"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
)

type Data struct {
	// Have to specify where to find the series title since
	// the field of this struct doesn't match the xml tag
	Cities []City `xml:"forecast5day"`
}

type City struct {
	Name     string    `xml:"city"`
	Weathers []Weather `xml:"data>weather"`
}

type Weather struct {
	Date             string `xml:"date"`
	TemperatureNight int    `xml:"temperatureNight"`
	TemperatureDay   int    `xml:"temperatureDay"`
	PhenoIDNight     int    `xml:"phenoIdNight"`
	PhenoNight       string `xml:"phenoNight"`
	PhenoIDDay       int    `xml:"phenoIdDay"`
	PhenoDay         string `xml:"phenoDay"`
	WindNight        int    `xml:"windNight"`
	WindDay          int    `xml:"windDay"`
}

func (c City) String() string {
	return fmt.Sprintf("%s", c.Name)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", Index)
	router.HandleFunc("/api/v1/weather", Index)

	log.Fatal(http.ListenAndServe(":8080", router))
}

func Index(w http.ResponseWriter, r *http.Request) {
	datas := Parse()

	// Set header
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(datas)
}

func GetRedisClient() *redis.Client {
	// Connection for redis
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	// Test connection to redis
	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

	return client
}

func Parse() Data {
	const redisKey = "data"
	client := GetRedisClient()
	var b []byte
	val, err := client.Get(redisKey).Result()

	if err == redis.Nil {
		b = Read()
		err := client.Set(redisKey, b, 4*time.Hour).Err() // 4 цаг тутамд шинэчлэнэ.

		if err != nil {
			log.Fatal(err)
		}
	} else if err != nil {
		log.Fatal(err)
	} else {
		b = []byte(val)
	}

	var q Data
	xml.Unmarshal(b, &q)

	return q
}

func Read() []byte {
	// Ус, цаг уурын хүрээлэнгээс зөвхөн xml формат бүхий API гаргаж өгсөн.
	// Энэ API нь xml -> json болгон хөрвүүлэх зорилготой.
	// Мөн хурдан байхаар шийдэгдсэн
	res, err := http.Get("http://tsag-agaar.gov.mn/forecast_xml")

	if err != nil {
		log.Fatal(err)
	}

	b, err := ioutil.ReadAll(res.Body)
	res.Body.Close()

	if err != nil {
		log.Fatal(err)
	}

	return b
}
