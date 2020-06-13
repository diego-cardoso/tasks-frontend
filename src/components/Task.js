import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback ,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {

    const doneOrNotStyle = props.doneAt != null ?
        {textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formateDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM - Y')

    const getRightContent = () => {
        return (
        <TouchableOpacity style={styles.right} 
            onPress={() => props.onDelete && props.onDelete(props.id)} >
            <Icon name="trash" size={30} color='#FFF' />
        </TouchableOpacity>
        )
    }
    const getLeftContent = () => {
        return (
        <View style={styles.left}>
            <Icon name="trash" size={20} color='#FFF' 
                style={styles.excludeIcon} />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
        )
    }

    return (
        <Swipeable 
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)} >
            <View style={styles.container}>
            <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formateDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#555',

    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 13,
        fontWeight: 'bold',
    },
    right: {
        backgroundColor: '#e67e22',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft: 10
    },
    excludeText:{
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
})