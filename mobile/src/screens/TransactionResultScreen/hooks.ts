import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { clearCart } from '../../store/appSlice';
import { RootStackParamList } from '../../types';
import { UI_CONSTANTS } from '../../constants';

type TransactionResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TransactionResult'>;
type TransactionResultScreenRouteProp = RouteProp<RootStackParamList, 'TransactionResult'>;

export const useTransactionResultScreen = () => {
  const navigation = useNavigation<TransactionResultScreenNavigationProp>();
  const route = useRoute<TransactionResultScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { transaction } = route.params;

  const handleContinueShopping = () => {
    dispatch(clearCart());
    navigation.navigate('Home');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return UI_CONSTANTS.COLORS.SUCCESS;
      case 'DECLINED':
      case 'FAILED':
        return UI_CONSTANTS.COLORS.ERROR;
      default:
        return UI_CONSTANTS.COLORS.WARNING;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'Aprobado';
      case 'DECLINED':
        return 'Declinado';
      case 'FAILED':
        return 'Fallido';
      default:
        return 'Pendiente';
    }
  };

  return {
    transaction,
    handleContinueShopping,
    getStatusColor,
    getStatusText,
  };
};
