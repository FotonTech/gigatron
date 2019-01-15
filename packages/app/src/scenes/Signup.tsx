import * as React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';
import { AsyncStorage } from 'react-native';
import { ROUTENAMES } from '../navigation/RouteName';
import Input from '../components/Input';
import Button from '../components/Button';

const Wrapper = styled(LinearGradient).attrs({
  colors: [theme.color.secondary, theme.color.primary],
  start: [0.0, 0.5],
  end: [1.0, 0.5],
  locations: [0.0, 1.0]
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text`
  align-self: center;
  text-align: center;
  font-size: ${(p: any) => p.theme.fontSize.large};
  color: ${(p: any) => p.theme.color.secondaryText};
  letter-spacing: 0.5;
`

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  name: string
  email: string
  password: string
}

class Signup extends React.Component<Props, State> {
  public static navigationOptions = {
    title: 'Sign Up',
  }

  public state = {
    name: "",
    email: "",
    password: ""
  }

  public handleSignup = () => {
    AsyncStorage.setItem('userToken', "token")
    this.props.navigation.navigate(ROUTENAMES.HOME)
  }

  public render() {
    const { navigation } = this.props
    const { name, email, password } = this.state

    return (
      <Wrapper>
        <Title>Sign in</Title>
        <Input value={name} placeholder="Name" onChange={(name) => this.setState({ name })} keyboardType="email-address" />
        <Input value={email} placeholder="E-mail" onChange={(email) => this.setState({ email })} keyboardType="email-address" />
        <Input value={password} placeholder="Password" onChange={(password) => this.setState({ password })} secureTextEntry={true} />
        <Button text="Signup" onPress={() => this.handleSignup()} />
      </Wrapper>
    )
  }
}

export default Signup
