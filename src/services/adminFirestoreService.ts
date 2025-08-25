import { getAdminFirestore } from '@/lib/firebase/adminApp';

// Server-side Firestore service using Admin SDK
// This service has elevated privileges and bypasses security rules

export class AdminFirestoreService {
  private db = getAdminFirestore();

  // Premium subscription operations
  async createPremiumSubscription(userId: string, data: any) {
    try {
      const docRef = this.db.collection('premium').doc(userId);
      await docRef.set(data, { merge: true });
      return { success: true, docId: userId };
    } catch (error) {
      throw new Error(`Failed to create premium subscription: ${error}`);
    }
  }

  async updatePremiumSubscription(userId: string, data: any) {
    try {
      const docRef = this.db.collection('premium').doc(userId);
      await docRef.update(data);
      return { success: true, docId: userId };
    } catch (error) {
      throw new Error(`Failed to update premium subscription: ${error}`);
    }
  }

  async deletePremiumSubscription(userId: string) {
    try {
      const docRef = this.db.collection('premium').doc(userId);
      await docRef.delete();
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete premium subscription: ${error}`);
    }
  }

  async getPremiumSubscription(userId: string) {
    try {
      const docRef = this.db.collection('premium').doc(userId);
      const doc = await docRef.get();
      return doc.exists ? { ...doc.data(), id: doc.id } : null;
    } catch (error) {
      throw new Error(`Failed to get premium subscription: ${error}`);
    }
  }

  // Payment operations
  async createPayment(paymentId: string, data: any) {
    try {
      const docRef = this.db.collection('payments').doc(paymentId);
      await docRef.set(data);
      return { success: true, docId: paymentId };
    } catch (error) {
      throw new Error(`Failed to create payment: ${error}`);
    }
  }

  async updatePayment(paymentId: string, data: any) {
    try {
      const docRef = this.db.collection('payments').doc(paymentId);
      await docRef.update(data);
      return { success: true, docId: paymentId };
    } catch (error) {
      throw new Error(`Failed to update payment: ${error}`);
    }
  }

  async deletePayment(paymentId: string) {
    try {
      const docRef = this.db.collection('payments').doc(paymentId);
      await docRef.delete();
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete payment: ${error}`);
    }
  }

  async getPayment(paymentId: string) {
    try {
      const docRef = this.db.collection('payments').doc(paymentId);
      const doc = await docRef.get();
      return doc.exists ? { ...doc.data(), id: doc.id } : null;
    } catch (error) {
      throw new Error(`Failed to get payment: ${error}`);
    }
  }

  async getPaymentsByUserId(userId: string) {
    try {
      const querySnapshot = await this.db
        .collection('payments')
        .where('userId', '==', userId)
        .get();

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      throw new Error(`Failed to get payments by user ID: ${error}`);
    }
  }
}

// Export singleton instance
export const adminFirestoreService = new AdminFirestoreService();
