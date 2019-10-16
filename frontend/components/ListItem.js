import React from "react";
import Link from "next/link";

export const phenoMap = {
  3: "cloudy-day-3.svg", // Үүлэрхэг
  5: "cloudy-day-3.svg", // Багавтар үүлтэй
  7: "cloudy-day-3.svg", // Багавтар үүлтэй
  9: "cloudy-day-3.svg", // Үүлшинэ
  10: "cloudy.svg", // 	Үүлшинэ
  20: "cloudy-day-3.svg", // 	Үүл багаснa
  21: "rainy-4.svg", // 	Бороо шиврэнэ
  22: "rainy-4.svg", // 	Бороо шиврэнэ
  23: "snowy-4.svg", // 	Ялимгүй цас
  24: "snowy-4.svg", // 	Ялимгүй цас
  27: "rainy-5.svg", // 	Ялимгүй хур тунадас
  28: "snowy-5.svg", // 	Ялимгүй хур тунадас
  60: "rainy-4.svg", // 	Бага зэргийн бороо
  61: "rainy-5.svg", // 	Бороо
  63: "rainy-6.svg", // 	Их бороо
  64: "snowy-4.svg", // 	Бага зэргийн хур тунадас
  65: "snowy-4.svg", // 	Хур тунадас
  70: "snowy-4.svg", // 	Бага зэргийн цас
  71: "snowy-4.svg", // 	Цас
  73: "snowy-5.svg", // 	Их цас
  75: "snowy-6.svg", // 	Аадар их цас
  80: "thunder.svg", // 	Хүчтэй аадар бороо
  90: "thunder.svg", // 	Түр зуурын бороо
  95: "thunder.svg" // 	Аадар хур тунадас
};

const ListItem = ({ city, href }) => {
  const todayWeather = city.weathers[0];
  const phenoIcon = phenoMap[todayWeather.PhenoIDDay];
  return (
    <>
      <Link href={href}>
        <a
          style={{
            backgroundImage: `url(${city.image})`
          }}
        >
          <div>
            <h2>
              {city.name}
              <small>{todayWeather.Date}</small>
            </h2>
            <div className="pheno-temp">
              <div>
                <embed src={`/pheno-svg/${phenoIcon}`} />
                <h1>{todayWeather.TemperatureDay}˚</h1>
              </div>
              <h4>{todayWeather.PhenoDay}</h4>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        a {
          display: block;
          color: #fff;
          text-decoration: none;
          background-color: #c13d4f;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 0.5rem;
          text-shadow: 1px 1px #000;
        }

        a > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          color: #fff;
          border-radius: 0.3rem;
        }

        h2 > small {
          display: block;
          font-weight: normal;
        }

        .pheno-temp {
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .pheno-temp > div {
          display: flex;
          align-items: center;
          line-height: 64px;
        }

        .pheno-temp > div embed {
          width: 64px;
          height: 64px;
        }

        .pheno-temp h4 {
          margin: 0;
          line-height: 1;
        }

        h1 {
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default ListItem;
