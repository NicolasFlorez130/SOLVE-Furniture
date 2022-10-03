import { GetStaticProps } from 'next';
import tw from 'twin.macro';
import { HEADERS } from '../../utils/globals';
import { Room as Room_T } from '../../types/rooms_api_response';
import Layout from '../_layout';
import Room from './components/Room';
import { TransitionScreen } from '../_transitionScreen';

interface Props {
   rooms: Room_T[];
}

const Index = ({ rooms }: Props) => {
   return (
      <TransitionScreen>
         <Layout inHome={true} footerLess={true}>
            <div id="roomsWrapper" tw="h-screen overflow-scroll">
               <div tw="flex">
                  {rooms.map(room => {
                     return <Room key={room.id} room={room} />;
                  })}
               </div>
            </div>
         </Layout>
      </TransitionScreen>
   );
};

export const getStaticProps: GetStaticProps = async ctx => {
   const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/rooms?populate=*', HEADERS);
   const data = await res.json();

   return {
      props: {
         rooms: data.data,
      },
   };
};

export default Index;
