import { AppRegistry } from 'react-native'

import App from '../../shared/components/App.tsx'

AppRegistry.registerComponent('myprojectname', () => App)
AppRegistry.runApplication('myprojectname', {
  rootTag: document.getElementById('root'),
})
