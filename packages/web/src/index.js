import { AppRegistry } from 'react-native'

import App from '@foton/shared/components/App'

AppRegistry.registerComponent('myprojectname', () => App)
AppRegistry.runApplication('myprojectname', {
  rootTag: document.getElementById('root'),
})
