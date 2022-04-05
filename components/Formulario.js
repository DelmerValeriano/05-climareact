import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export const Formulario = ({busqueda, setBusqueda,setConsultar}) => {
  const {pais, ciudad} = busqueda;

  const [animacioboton] = useState(new Animated.Value(1));

  const animacionEntrada = () => {
    Animated.spring(animacioboton, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacioboton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacioboton}],
  };
  const mostrarAlerta=()=>{
      Alert.alert(
          'Error',
          'Agrega una ciudad y país a la búsquedad'
      )
  }

  const consultarClima=()=>{
      if (pais.trim() === '' || ciudad.trim() === '') {
        mostrarAlerta();
        return;
      }
      //consultar la api
      setConsultar(true)

  }

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            onChangeText={ciudad => setBusqueda({...busqueda, ciudad})}
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#666"
          />
        </View>

        <View>
          <Picker
            style={{backgroundColor: '#FFF'}}
            selectedValue={pais}
            onValueChange={pais => setBusqueda({...busqueda, pais})}
          >
            <Picker.Item label="--Seleccione--" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="Es" />
            <Picker.Item label="Peru" value="PE" />
            <Picker.Item label="Honduras" value="HN" />
          </Picker>
        </View>

        <Pressable
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={()=>consultarClima()}
        >
          <Animated.View style={[styles.bntBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  bntBuscar: {
    marginTop: 40,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  textoBuscar: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
