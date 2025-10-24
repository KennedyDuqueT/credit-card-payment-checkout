import { StyleSheet } from 'react-native';
import { UI_CONSTANTS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  header: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    padding: UI_CONSTANTS.SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: UI_CONSTANTS.COLORS.BORDER,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  headerSubtitle: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  listContainer: {
    padding: UI_CONSTANTS.SPACING.MD,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.MD,
    marginBottom: UI_CONSTANTS.SPACING.MD,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: UI_CONSTANTS.SPACING.MD,
    flex: 1,
    justifyContent: 'space-between',
  },
  productContent: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  productDescription: {
    fontSize: 12,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
    marginBottom: UI_CONSTANTS.SPACING.SM,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
    marginBottom: UI_CONSTANTS.SPACING.MD,
  },
  addButton: {
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    paddingVertical: UI_CONSTANTS.SPACING.SM,
    paddingHorizontal: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  addButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  loadingText: {
    marginTop: UI_CONSTANTS.SPACING.MD,
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
    padding: UI_CONSTANTS.SPACING.LG,
  },
  errorText: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.ERROR,
    textAlign: 'center',
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  retryButton: {
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    paddingVertical: UI_CONSTANTS.SPACING.SM,
    paddingHorizontal: UI_CONSTANTS.SPACING.LG,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
  },
  retryButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
  },
});
