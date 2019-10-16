import React from "react";
import axios from "axios";
import Head from "../../components/head";
import Container from "../../components/container";
import Loading from "../../components/loading";
import ListItem from "../../components/ListItem";

const FunctionList = () => {
  const [cities, setCities] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get("/api/cities").then(response => {
      setCities(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Head title="FunctionList" />
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {cities.map((city, index) => (
              <li key={`${index}_${city.key}`}>
                <ListItem city={city} href={`/function/${city.key}`} />
              </li>
            ))}
          </ul>
        )}
      </Container>
      <style jsx>{`
        ul {
          padding: 1rem;
          list-style: none;
        }

        ul li {
          padding-left: 0;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default FunctionList;
