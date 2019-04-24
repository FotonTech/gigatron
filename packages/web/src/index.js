import { AppRegistry } from 'react-native'
import './index.css'

import App from '@foton/shared/src/App'

AppRegistry.registerComponent('myprojectname', () => App)
AppRegistry.runApplication('myprojectname', {
  rootTag: document.getElementById('root'),
})
