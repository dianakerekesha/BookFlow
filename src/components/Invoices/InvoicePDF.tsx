import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import type { Order } from '@/types/Order';
import { COLORS } from '@/constants/colors';

// Fix: використовуємо абсолютний URL щоб @react-pdf/renderer міг знайти шрифти
// import.meta.env.BASE_URL = '/books-catalog-frontend/'
const BASE = `${window.location.origin}${import.meta.env.BASE_URL}`;

Font.register({
  family: 'Manrope',
  fonts: [
    { src: `${BASE}fonts/Manrope-Regular.ttf`, fontWeight: 400 },
    { src: `${BASE}fonts/Manrope-SemiBold.ttf`, fontWeight: 600 },
    { src: `${BASE}fonts/Manrope-Bold.ttf`, fontWeight: 700 },
    { src: `${BASE}fonts/Manrope-ExtraBold.ttf`, fontWeight: 800 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Manrope',
    fontWeight: 400,
    fontSize: 10,
    color: COLORS.primary,
    padding: '48 48 64 48',
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingBottom: 24,
    borderBottom: `1 solid ${COLORS.elements}`,
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: -0.5,
    color: COLORS.primary,
  },
  invoiceLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.secondary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  invoiceId: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.primary,
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1.5,
    color: COLORS.secondary,
    marginBottom: 5,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgePaid: { backgroundColor: '#dcfce7' },
  badgePending: { backgroundColor: '#fef9c3' },
  badgeFailed: { backgroundColor: '#fee2e2' },
  badgeCancelled: { backgroundColor: COLORS.hoverAndBg },
  badgeText: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  badgeTextPaid: { color: COLORS.green },
  badgeTextPending: { color: '#ca8a04' },
  badgeTextFailed: { color: COLORS.red },
  badgeTextCancelled: { color: COLORS.secondary },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.hoverAndBg,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottom: `1 solid ${COLORS.elements}`,
    alignItems: 'center',
  },
  colImg: { width: 36, marginRight: 10 },
  colItem: { flex: 1 },
  colQty: { width: 60, textAlign: 'center' },
  colPrice: { width: 60, textAlign: 'right' },
  colTotal: { width: 60, textAlign: 'right' },
  thText: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1,
    color: COLORS.secondary,
  },
  bookImg: {
    width: 36,
    height: 48,
    objectFit: 'cover',
    borderRadius: 2,
  },
  tdTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 2,
  },
  tdAuthor: {
    fontSize: 8,
    fontWeight: 400,
    color: COLORS.secondary,
  },
  tdText: {
    fontSize: 10,
    fontWeight: 400,
    color: COLORS.secondary,
  },
  tdTextBold: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.primary,
  },
  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalDivider: {
    height: 1,
    backgroundColor: COLORS.elements,
    width: 200,
    marginVertical: 8,
  },
  totalLabel: { fontSize: 10, fontWeight: 400, color: COLORS.secondary },
  totalValue: { fontSize: 10, fontWeight: 400, color: COLORS.secondary },
  grandLabel: { fontSize: 12, fontWeight: 700, color: COLORS.primary },
  grandValue: { fontSize: 14, fontWeight: 800, color: COLORS.primary },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `1 solid ${COLORS.elements}`,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    fontWeight: 400,
    color: COLORS.icons,
  },
});

const getPrice = (item: {
  priceDiscount: number | null;
  priceRegular: number;
}) => item.priceDiscount ?? item.priceRegular;

const getBadgeStyle = (status: Order['status']) => {
  const map = {
    paid: { badge: styles.badgePaid, text: styles.badgeTextPaid },
    pending: { badge: styles.badgePending, text: styles.badgeTextPending },
    processing: { badge: styles.badgePending, text: styles.badgeTextPending },
    failed: { badge: styles.badgeFailed, text: styles.badgeTextFailed },
    cancelled: {
      badge: styles.badgeCancelled,
      text: styles.badgeTextCancelled,
    },
  };
  return map[status] ?? map.pending;
};

interface InvoicePDFProps {
  order: Order;
}

export const InvoicePDF = ({ order }: InvoicePDFProps) => {
  const badgeStyle = getBadgeStyle(order.status);

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>NICE BOOOK</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.invoiceLabel}>INVOICE</Text>
            <Text style={styles.invoiceId}>{order.id}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            paddingBottom: 20,
            borderBottom: `1 solid ${COLORS.elements}`,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.metaLabel}>DATE</Text>
            <Text
              style={{ fontSize: 11, fontWeight: 700, color: COLORS.primary }}
            >
              {new Date(order.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.metaLabel}>PAYMENT</Text>
            <Text
              style={{ fontSize: 11, fontWeight: 700, color: COLORS.primary }}
            >
              {order.paymentMethod === 'stripe' ? 'Stripe (Card)' : 'LiqPay'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.metaLabel}>STATUS</Text>
            <View style={[styles.badge, badgeStyle.badge]}>
              <Text style={[styles.badgeText, badgeStyle.text]}>
                {order.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 36 }}>
          <View style={{ flex: 1, paddingRight: 24 }}>
            <Text style={styles.metaLabel}>BILL TO</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: COLORS.primary,
                marginBottom: 4,
              }}
            >
              {order.customer.firstName} {order.customer.lastName}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 400,
                color: COLORS.secondary,
                marginBottom: 2,
              }}
            >
              {order.customer.email}
            </Text>
            <Text
              style={{ fontSize: 10, fontWeight: 400, color: COLORS.secondary }}
            >
              {order.customer.phone}
            </Text>
          </View>

          <View
            style={{
              width: 1,
              backgroundColor: COLORS.elements,
              marginHorizontal: 8,
            }}
          />

          <View style={{ flex: 1, paddingLeft: 24 }}>
            <Text style={styles.metaLabel}>SHIP TO</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: COLORS.primary,
                marginBottom: 4,
              }}
            >
              {order.customer.firstName} {order.customer.lastName}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 400,
                color: COLORS.secondary,
                marginBottom: 2,
              }}
            >
              {order.customer.address}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 400,
                color: COLORS.secondary,
                marginBottom: 2,
              }}
            >
              {order.customer.city}, {order.customer.zip}
            </Text>
            <Text
              style={{ fontSize: 10, fontWeight: 400, color: COLORS.secondary }}
            >
              {order.customer.country}
            </Text>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <View style={styles.colImg} />
          <View style={styles.colItem}>
            <Text style={styles.thText}>ITEM</Text>
          </View>
          <View style={styles.colQty}>
            <Text style={styles.thText}>QUANTITY</Text>
          </View>
          <View style={styles.colPrice}>
            <Text style={styles.thText}>PRICE</Text>
          </View>
          <View style={styles.colTotal}>
            <Text style={styles.thText}>TOTAL</Text>
          </View>
        </View>

        {order.items.map((item) => (
          <View
            key={item.id}
            style={styles.tableRow}
          >
            <View style={styles.colImg}>
              {item.images?.[0] && (
                <Image
                  src={item.images[0]}
                  style={styles.bookImg}
                />
              )}
            </View>
            <View style={styles.colItem}>
              <Text style={styles.tdTitle}>{item.name}</Text>
              <Text style={styles.tdAuthor}>
                {item.author} · {item.type}
              </Text>
            </View>
            <View style={styles.colQty}>
              <Text style={styles.tdText}>{item.quantity}</Text>
            </View>
            <View style={styles.colPrice}>
              <Text style={styles.tdText}>${getPrice(item).toFixed(2)}</Text>
            </View>
            <View style={styles.colTotal}>
              <Text style={styles.tdTextBold}>
                ${(getPrice(item) * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${order.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>—</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.grandLabel}>Total</Text>
            <Text style={styles.grandValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>NICE BOOOK · niceboook.com</Text>
          <Text style={styles.footerText}>
            Generated {new Date().toLocaleDateString('en-GB')}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
