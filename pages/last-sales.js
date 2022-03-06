import { useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    'https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json',
  );

  // useEffect(() => {
  //   fetch('https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Loading...</p>;
  }

  if (!data && !sales) {
    return <p>No data yet</p>;
  }

  return (
    <ul>
      {sales?.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

// We can't use hooks here, because its not about React thing
export async function getStaticProps() {
  return fetch(
    'https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json',
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return { props: { sales: transformedSales }, revalidate: 10 };
    });
}

export default LastSalesPage;
