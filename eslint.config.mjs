import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    // any가 있는 모든 곳에서 에러 발생시킴
    // 그러나 의도적으로 any를 사용하는 경우도 있고
    // strict:true만으로도 충분(?)하므로
    // 굳이 이 옵션을 사용할 필요는 없을듯?
    // rules: {
    //   '@typescript-eslint/no-explicit-any': 'error',
    // },
  },
];

export default eslintConfig;
