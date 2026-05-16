import { StyleSheet } from 'react-native';

const HospitalStyles = StyleSheet.create({
  //screen container
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  //search bar 
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    fontSize: 15,
    color: '#1e293b',
  },
  searchButton: {
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: '#AC3130',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //section label 
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 4,
  },

  //hospital card
  cardItem: {
    flex: 1,
    margin: 5,
    borderRadius: 14,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  cardContainer: {
    padding: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 18,
  },
  phoneText: {
    fontSize: 13,
    color: '#475569',
  },
  deptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  deptChip: {
    backgroundColor: '#ffeeee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  deptChipText: {
    fontSize: 12,
    color: '#AC3130',
    fontWeight: '500',
  },

  //booking card
  bookingCard: {
    marginBottom: 12,
    borderRadius: 14,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  queueNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#AC3130',
    textAlign: 'center',
    marginVertical: 6,
  },
  queueLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bookingInfo: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  bookingInfoBold: {
    fontWeight: '600',
    color: '#1e293b',
  },

  // booking form
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#AC3130',
    marginBottom: 6,
    marginTop: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    fontSize: 15,
  },
  dateButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  dateButtonText: {
    fontSize: 15,
    color: '#475569',
  },
  dateButtonTextSelected: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  errorText: {
    fontSize: 13,
    color: '#ef4444',
    marginTop: 10,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },

  // uth screen
  authContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    padding: 28,
  },
  authTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 6,
  },
  authSubtitle: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 32,
  },
  authInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 14,
  },
  authButton: {
    height: 52,
    backgroundColor: '#AC3130',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  authLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  authLinkText: {
    fontSize: 14,
    color: '#64748b',
  },
  authLinkBold: {
    color: '#AC3130',
    fontWeight: '600',
  },
  authLogo: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
  },

  // empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 13,
    color: '#cbd5e1',
    marginTop: 4,
  },

  //detail screen
  detailHeader: {
    backgroundColor: '#AC3130',
    padding: 20,
    paddingTop: 40,
  },
  detailHeaderName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  detailHeaderAddr: {
    fontSize: 14,
    color: '#f5b5b5',
    lineHeight: 20,
  },
  detailSection: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
  },
  detailSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  deptRow2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  deptChip2: {
    backgroundColor: '#fff0f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f5b5b5',
  },
  deptChipText2: {
    fontSize: 14,
    color: '#AC3130',
    fontWeight: '500',
  },
  bookButtonWrap: {
    margin: 16,
    marginTop: 8,
  },
});

export default HospitalStyles;
