
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RepairmenLoading from '../components/animation/RepairmenLoading';
import BottomRepairmen from './repairmen/BottomRepairmen';
import BottomTab from './client/BottomTab';
import { getRoleUserAsyncStorage } from '../service/getData';
import ListRepairmen from '../screens/client/ListRepairmen';
import { auth } from '../database/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}
const RoleStacks = createNativeStackNavigator();
export default function AppStack() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(async () => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    
    const role = await AsyncStorage.getItem('role');
    if(role==='client'){
      setRole('client')
    }else if(role ==='repairmen'){
      setRole('repairmen')
    }

  }, []);

  
  return (
    <RoleStacks.Navigator >
      {loading ?
        (<RoleStacks.Screen name='loading' component={RepairmenLoading} options={{ headerShown: false }} />)
        : (role === 'client') ?
          (<RoleStacks.Screen name='home_user' component={BottomTab} options={{ headerShown: false }} />) :
          (<RoleStacks.Screen name='home_repairmen' component={BottomRepairmen} options={{ headerShown: false }} />)}
      <RoleStacks.Screen name="listRepairmen"
        component={ListRepairmen}
        options={({ route }) => ({
          title: truncate(route.params.name, 25),
          headerTitleAlign: 'center',
        })} />
    </RoleStacks.Navigator>
  )
}