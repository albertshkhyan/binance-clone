import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    fontSize: 14,
  },
});
