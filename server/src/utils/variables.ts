import _ from "lodash"
import { config } from "dotenv";
config();
export const complexityOptions = {
  min: 12,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};


const corsWhitelist = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(';') : [];
if (_.lowerCase(process.env.NODE_ENV) === _.lowerCase('development')) {
  corsWhitelist.push('http://localhost:8000');
}

export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin || 'undefined'} origin not allowed by Rangurura CORS policy`));
    }
  },
  optionsSuccessStatus: 200,
  credentials:true
};