import React from "react";
import { phenoMap } from "./ListItem";

export default function SinglePage({ city }) {
  const [todayWeather, ...otherDays] = city.weathers;
  const phenoIcon = phenoMap[todayWeather.PhenoIDDay];

  return (
    <>
      <div className="page">
        <div
          className="background"
          style={{ backgroundImage: `url(${city.image})` }}
        ></div>
        <div className="content">
          <div className="flex-row space-between">
            <div className="pheno-temp">
              <div className="flex-row">
                <h1>{todayWeather.TemperatureDay}˚</h1>
                <embed src={`/pheno-svg/${phenoIcon}`} />
              </div>
              <h4>{todayWeather.PhenoDay}</h4>
            </div>
            <div>
              <h1>{city.name}</h1>
              <h3>{todayWeather.Date}</h3>
            </div>
          </div>
          <div className="info">
            <ul>
              {otherDays.map(day => {
                const _phenoDayIcon = phenoMap[day.PhenoIDDay];
                const _phenoNightIcon = phenoMap[day.PhenoIDNight];
                return (
                  <li key={day.Date}>
                    <h3>{day.Date}</h3>
                    <div className="flex-row">
                      <embed src={`/pheno-svg/day.svg`} />
                      <h1 style={{ lineHeight: "64px" }}>
                        {day.TemperatureDay}˚
                      </h1>
                      <embed src={`/pheno-svg/${_phenoDayIcon}`} />
                    </div>
                    <div className="flex-row">
                      <embed src={`/pheno-svg/night.svg`} />
                      <h1 style={{ lineHeight: "64px" }}>
                        {day.TemperatureNight}˚
                      </h1>
                      <embed src={`/pheno-svg/${_phenoNightIcon}`} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h4,
        h6 {
          margin: 0;
        }

        .page {
          height: 100vh;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .background {
          position: absolute;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          height: 110vh;
          width: 110vw;
          filter: blur(10px);
          z-index: -1;
        }
        .content {
          max-width: 960px;
          width: 100%;
          min-height: 400px;
          position: relative;
          padding: 1rem;
          text-shadow: 1px 1px #000;
          color: #fff;
        }

        .pheno-temp {
          display: flex;
          flex-direction: column;
        }

        .flex-row {
          display: flex;
          flex-direction: row;
        }

        .space-between {
          justify-content: space-between;
        }

        .pheno-temp h1 {
          font-size: 5rem;
        }

        .info {
          margin-top: 10rem;
          height: 250px;
        }

        ul {
          padding: 0;
          list-style: none;
        }

        ul li {
          display: inline-block;
          padding: 1rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
