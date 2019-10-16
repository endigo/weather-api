import React from "react";
import axios from "axios";
import Head from "../../components/head";
import SinglePage from "../../components/SinglePage";

const FunctionDetail = ({ city }) => {
  // const [city, setCity] = React.useState([]);
  // const router = useRouter();

  // React.useEffect(() => {
  //   if (router.query.id) {
  //     axios.get(`/api/cities/${router.query.id}`).then(response => {
  //       setCity(response.data);
  //       setLoading(false);
  //     });
  //   }
  // }, [router.query.id]);

  return (
    <>
      <Head title={`${city.name} | FunctionDetail`} />
      <SinglePage city={city} />
    </>
  );
};

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
