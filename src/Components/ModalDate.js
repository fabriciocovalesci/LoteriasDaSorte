import * as React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import { Divider, Colors, Button, Provider, Modal, Portal } from 'react-native-paper';
import moment from 'moment';
import "moment/locale/pt-br"
moment.locale('pt-br')

export const ModalDate = (props) => {

    const [date, setDate] = React.useState('');
    const containerStyle = { backgroundColor: 'white', margin: 20 };
    return (
        <>
            <Portal>
                <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
                    <DatePicker
                        mode="monthYear"
                        selectorStartingYear={1995}
                        options={{}}
                        onMonthYearChange={selectedDate => {setDate(selectedDate); props.getdate(selectedDate)} }
                    />
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Button mode="outlined" style={{ marginBottom: 15, borderColor: Colors.blue400, width: "50%", borderWidth: 1 }} onPress={props.hideModal}>
                        Salvar e Fechar
                    </Button>
                    </View>
                </Modal>
            </Portal>
        </>
    )
}