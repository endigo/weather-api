package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"encoding/json"
	"encoding/xml"
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

func Handler(w http.ResponseWriter, r *http.Request) {
	datas := Parse()

	// Set header
	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	// allow cross domain AJAX requests
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Cache-Control", "s-maxage=1800")
	json.NewEncoder(w).Encode(datas)
}


func Parse() Data {
	var b []byte
	// try parse from xml
	b = Read()

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
