import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import { STRAPI_URL } from '../../../globalVariables';
import { Room as Room_T } from '../../../types/rooms_api_response';

interface Props {
   room: Room_T;
}

interface CircleProps {
   bgImage: string;
}

const Circle = styled.div<CircleProps>`
   aspect-ratio: 1/1;
   background-size: 100%;

   transition: 0.5s;

   &:hover {
      background-size: 110%;
   }

   ${tw`
      bg-blend-multiply bg-center bg-gray-300
      cursor-pointer
      grid place-items-center
      rounded-full
   `}

   h3 {
      ${tw`
         text-center text-titles text-4xl
         px-0
      `}
   }

   ${({ bgImage }) => {
      return `background-image: url(${STRAPI_URL + bgImage})`;
   }}
`;

const Room = ({ room }: Props) => {
   return (
      <Link href={'/rooms/' + room.attributes.place.toLocaleLowerCase()}>
         <Circle bgImage={room.attributes.image.data.attributes.url}>
            <h3>{room.attributes.place.toUpperCase()}</h3>
         </Circle>
      </Link>
   );
};

export default Room;
