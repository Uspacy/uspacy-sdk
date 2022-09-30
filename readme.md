## Install

```sh
npm install --save @uspacy/sdk
```

## Example

```javascript
import Uspacy from '@uspacy/sdk';

const uspacyClient = Uspacy({
	apiUrl: 'https://company_name.uspacy.com.ua',
});

uspacyClient.auth.login('root@gmail.com', '123456');

```
