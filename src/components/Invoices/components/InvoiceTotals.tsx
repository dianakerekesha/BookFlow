import { Text, View } from '@react-pdf/renderer';
import { invoiceStyles } from '../constants/invoiceStyles';
import type { InvoiceTotalsProps } from '../types/invoice';

export const InvoiceTotals = ({ subtotal, total }: InvoiceTotalsProps) => (
  <View style={invoiceStyles.totalsSection}>
    <View style={invoiceStyles.totalRow}>
      <Text style={invoiceStyles.totalLabel}>Subtotal</Text>
      <Text style={invoiceStyles.totalValue}>${subtotal.toFixed(2)}</Text>
    </View>
    <View style={invoiceStyles.totalRow}>
      <Text style={invoiceStyles.totalLabel}>Shipping</Text>
      <Text style={invoiceStyles.totalValue}>—</Text>
    </View>
    <View style={invoiceStyles.totalDivider} />
    <View style={invoiceStyles.totalRow}>
      <Text style={invoiceStyles.grandLabel}>Total</Text>
      <Text style={invoiceStyles.grandValue}>${total.toFixed(2)}</Text>
    </View>
  </View>
);
