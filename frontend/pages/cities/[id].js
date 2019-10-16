import React from "react";
import axios from "axios";
import Head from "../../components/head";
import SinglePage from "../../components/SinglePage";

const FunctionDetail = ({ city }) => (
  <>
    <Head title={`${city.name} | FunctionDetail`} />
    <SinglePage city={city} />
  </>
);

FunctionDetail.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const rootUrl = process.env.ROOT_URL;
  const city = await axios
    .get(`${rootUrl}/api/cities/${id}`)
    .then(response => response.data);
  return {
    city
  };
};

export default FunctionDetail;
