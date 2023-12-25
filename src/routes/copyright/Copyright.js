import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
   return (
      <Typography variant='body2' color='text.secondary' align='center' {...props}>
         {'Copyright © '}
         <Link color='inherit' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'>
            A Better City
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}
