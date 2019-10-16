import React from "react";
import axios from "axios";
import Head from "../../components/head";
import SinglePage from "../../components/SinglePage";

class ClassDetail extends React.Component {
  static async getInitialProps(ctx) {
    const { id } = ctx.query;
    const rootUrl = process.env.ROOT_URL;
    const city = await axios
      .get(`${rootUrl}/api/cities/${id}`)
      .then(response => response.data);
    return {
      city
    };
  }

  render() {
    const { city } = this.props;

    return (
      <>
        <Head title={`${city.name} | ClassDetail`} />
        <SinglePage city={city} />
      </>
    );
  }
}

export default ClassDetail;
