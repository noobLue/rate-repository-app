import { Pressable, StyleSheet } from 'react-native'
import Text from '../Text'
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    tab: {
        padding: 14,
    }
});

const AppBarTab = ({to, children}) => {
    return (<Link to={to} style={styles.tab}>
        <Text color='appBarText' fontWeight='bold' >{children}</Text>
    </Link>)
}

export const PressableTab = ({callback, children}) => {
  return <Pressable onPress={callback} style={styles.tab}>
    <Text color="white" fontWeight="bold">{children}</Text>
  </Pressable>;
}

export default AppBarTab