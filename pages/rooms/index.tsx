import { GetStaticProps } from 'next';
import tw from 'twin.macro';
import { HEADERS, STRAPI_URL } from '../../globalVariables';
import { Room as Room_T } from '../../types/rooms_api_response';
import Layout from '../_layout';
import Room from './components/Room';

interface Props {
   rooms: Room_T[];
}

const index = ({ rooms }: Props) => {
   return (
      <Layout inHome={true} footerLess={true}>
         <div tw='flex overflow-scroll'>
            {rooms.map(room => {
               return <Room key={room.id} room={room} />;
            })}
         </div>
      </Layout>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const res = await fetch(STRAPI_URL + '/api/rooms?populate=*', HEADERS);
   const data = await res.json();

   return {
      props: {
         rooms: data.data,
      },
   };
};

export default index;
