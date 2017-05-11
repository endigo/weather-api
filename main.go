package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"encoding/json"

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

	log.Fatal(http.ListenAndServe(":8080", router))
}

func Index(w http.ResponseWriter, r *http.Request) {
	datas := Parse()

	json.NewEncoder(w).Encode(datas)
}

func Parse() Data {
	res, err := http.Get("http://tsag-agaar.gov.mn/forecast_xml")

	if err != nil {
		log.Fatal(err)
	}

	b, err := ioutil.ReadAll(res.Body)
	res.Body.Close()

	if err != nil {
		log.Fatal(err)
	}

	var q Data
	xml.Unmarshal(b, &q)

	return q
}
