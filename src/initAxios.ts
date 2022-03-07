import axios from 'axios';
import { addJwtInterceptors } from 'api/interceptors/jwt';

addJwtInterceptors(axios);
