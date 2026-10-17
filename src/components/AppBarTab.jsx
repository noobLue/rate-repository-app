import { StyleSheet } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    tab: {
        padding: 15,
    }
});

const AppBarTab = ({to, children}) => {
    return (<Link to={to} style={styles.tab}>
        <Text color='appBarText' fontWeight='bold' >{children}</Text>
    </Link>)
}

export default AppBarTab