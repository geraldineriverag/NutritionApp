// src/screens/NewAppointmentScreen.tsx
import React, {useState} from 'react';
import { View, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonApp from "../../components/ButtonApp";
import { createAppointment} from "../../services/AppointmentService";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NutritionistStackParamList} from "../../navigation/NutritionistNavigator";

type Props = NativeStackScreenProps<NutritionistStackParamList,'NewAppointments'>;

const NewAppointmentScreen: React.FC<Props> = ({navigation,route}) => {
    const { patientId } = route.params; // pásalo al navegar
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const submit = async () => {
        try{
            await createAppointment(patientId, date.toISOString());
            Alert.alert('¡Cita creada!');
            navigation.goBack();
        }catch(e){ Alert.alert('Error','No se pudo crear cita'); }
    };

    return (
        <View style={{flex:1,padding:20,justifyContent:'center'}}>
            <ButtonApp title="Seleccionar fecha y hora" onPress={()=>setShow(true)} />
            {show && (
                <DateTimePicker
                    value={date}
                    mode="datetime"
                    display="default"
                    onChange={(_,d)=>{if(d) setDate(d); setShow(false);}}
                />
            )}
            <ButtonApp title="Agendar cita" onPress={submit} />
        </View>
    );
};
export default NewAppointmentScreen;
