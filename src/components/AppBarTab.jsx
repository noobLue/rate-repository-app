import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
    tab: {
        padding: 15,
    }
});

const AppBarTab = ({children}) => {
    return (<Pressable style={styles.tab}>
        <Text color='appBarText' fontWeight='bold' >{children}</Text>
    </Pressable>)
}

export default AppBarTab