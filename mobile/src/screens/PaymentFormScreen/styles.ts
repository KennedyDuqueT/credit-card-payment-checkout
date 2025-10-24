import { StyleSheet } from 'react-native';
import { UI_CONSTANTS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: UI_CONSTANTS.SPACING.MD,
    paddingBottom: UI_CONSTANTS.SPACING.XL * 3, // Extra space for floating button and keyboard
    flexGrow: 1,
  },
  header: {
    padding: UI_CONSTANTS.SPACING.LG,
    marginBottom: UI_CONSTANTS.SPACING.LG,
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  headerSubtitle: {
    fontSize: 18,
    color: UI_CONSTANTS.COLORS.PRIMARY,
    fontWeight: '600',
  },
  formContainer: {
    padding: UI_CONSTANTS.SPACING.LG,
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  inputContainer: {
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: UI_CONSTANTS.SPACING.LG,
    paddingHorizontal: 0,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: UI_CONSTANTS.COLORS.TEXT,
    minHeight: 50,
  },
  inputError: {
    borderBottomColor: UI_CONSTANTS.COLORS.ERROR,
  },
  errorText: {
    color: UI_CONSTANTS.COLORS.ERROR,
    fontSize: 14,
    marginTop: UI_CONSTANTS.SPACING.SM,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  continueButton: {
    backgroundColor: UI_CONSTANTS.COLORS.SUCCESS,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    paddingHorizontal: UI_CONSTANTS.SPACING.MD,
    paddingVertical: UI_CONSTANTS.SPACING.LG,
    borderTopWidth: 1,
    borderTopColor: UI_CONSTANTS.COLORS.BORDER,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
