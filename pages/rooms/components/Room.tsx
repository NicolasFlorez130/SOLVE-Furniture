import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import CommonButton from '../../../components/CommonButton';
import { Room as Room_T } from '../../../types/rooms_api_response';

interface Props {
   room: Room_T;
}

interface ContainerProps {
   bgUrl: string;
}

const Container = styled.div<ContainerProps>`
   ${tw`
      bg-blend-multiply bg-center bg-cover bg-fixed bg-opacity-30 bg-texts
      flex flex-col flex-none justify-center items-center
      h-screen w-screen
   `}

   h2 {
      ${tw`
         mb-4
         text-center text-titles text-5xl
      `}
   }

   ${({ bgUrl }) => {
      return `background-image: url(${process.env.NEXT_PUBLIC_API + bgUrl})`;
   }}
`;

const Room = ({ room }: Props) => {
   return (
      room && (
         <Container bgUrl={room.attributes.image.data.attributes.url}>
            <h2>{room.attributes.place}</h2>
            <Link href={'rooms/' + room.attributes.place.toLowerCase()}>
               <a>
                  <CommonButton type="inverse">EXPLORE</CommonButton>
               </a>
            </Link>
         </Container>
      )
   );
};

export default Room;
