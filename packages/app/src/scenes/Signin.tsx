import * as React from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components/native'
import Button from '../components/Button';
import Input from '../components/Input';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';
import { ROUTENAMES } from '../navigation/RouteName';

interface Props {
  navigation: NavigationScreenProp<any, any>
}

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

interface State {
  email: string
  password: string
}

class Signin extends React.Component<Props, State> {
  public static navigationOptions = {
    header: null,
  }

  public state = {
    email: "",
    password: ""
  }

  public handleSignin = () => {
    AsyncStorage.setItem('userToken', "token")
    this.props.navigation.navigate(ROUTENAMES.HOME)
  }

  public render() {
    const { navigation } = this.props
    const { email, password } = this.state
    return (
      <Wrapper>
        <Title>Sign in</Title>
        <Input value={email} placeholder="E-mail" onChange={(email) => this.setState({ email })} keyboardType="email-address" />
        <Input value={password} placeholder="Password" onChange={(password) => this.setState({ password })} secureTextEntry={true} />
        <Button text="Signin" onPress={() => this.handleSignin()} />
        <Button text="Signup?" onPress={() => navigation.navigate(ROUTENAMES.SIGNUP)} />
      </Wrapper>
    )
  }
}

export default Signin
