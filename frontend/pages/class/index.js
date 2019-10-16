import React from "react";
import axios from "axios";
import Head from "../../components/head";
import Container from "../../components/container";
import Loading from "../../components/loading";
import ListItem from "../../components/ListItem";

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios.get("/api/cities").then(response => {
      this.setState({
        cities: response.data,
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading, cities } = this.state;
    return (
      <>
        <Head title="ClassList" />
        <Container>
          {isLoading ? (
            <Loading />
          ) : (
            <ul>
              {cities.map((city, index) => (
                <li key={`${index}_${city.key}`}>
                  <ListItem city={city} href={`/class/${city.key}`} />
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
      </>
    );
  }
}

export default ClassList;
