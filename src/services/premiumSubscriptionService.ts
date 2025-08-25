// Client-side service for premium subscription operations
// Uses API calls instead of direct Firestore writes due to security rules

export interface PremiumSubscriptionData {
  userId: string;
  isPremium: boolean;
  subscriptionEndDate: string | null;
  billingKey: string | null;
  billingKeyCreatedAt: string | null;
  subscriptionStartedAt: string | null;
  subscriptionStatus: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: string;
}

class PremiumSubscriptionService {
  /**
   * Create initial premium subscription document
   * Replaces client-side createUserPremiumDocument function
   */
  static async createPremiumDocument(
    userId: string,
  ): Promise<ApiResponse<any>> {
    try {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create premium document');
      }

      return data;
    } catch (error) {
      throw new Error(
        `Premium document creation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Update premium subscription data
   */
  static async updatePremiumSubscription(
    userId: string,
    subscriptionData: Partial<PremiumSubscriptionData>,
  ): Promise<ApiResponse<any>> {
    try {
      const response = await fetch('/api/subscription/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, subscriptionData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update premium subscription');
      }

      return data;
    } catch (error) {
      throw new Error(
        `Premium subscription update failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Create payment record
   */
  static async createPaymentRecord(
    paymentId: string,
    userId: string,
    paymentData: any,
  ): Promise<ApiResponse<any>> {
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId, userId, paymentData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment record');
      }

      return data;
    } catch (error) {
      throw new Error(
        `Payment record creation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Delete premium subscription document
   */
  static async deletePremiumDocument(
    userId: string,
  ): Promise<ApiResponse<any>> {
    try {
      const response = await fetch('/api/subscription/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete premium document');
      }

      return data;
    } catch (error) {
      throw new Error(
        `Premium document deletion failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Update user subscription with billing key and payment info
   * Replaces client-side updateUserSubscription function
   */
  static async updateUserSubscription(
    userId: string,
    billingKey: string,
    subscriptionInfo?: any,
  ): Promise<ApiResponse<any>> {
    try {
      // Calculate subscription end date (30 days from now)
      const currentTime = new Date();
      const subscriptionEndDate = new Date(currentTime);
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

      const subscriptionData: Partial<PremiumSubscriptionData> = {
        isPremium: true,
        billingKey,
        billingKeyCreatedAt: currentTime.toISOString(),
        subscriptionStartedAt: currentTime.toISOString(),
        subscriptionEndDate: subscriptionEndDate.toISOString(),
        subscriptionStatus: 'active',
      };

      if (subscriptionInfo) {
        subscriptionData.subscriptionStatus = subscriptionInfo.status;
        subscriptionData.isPremium = subscriptionInfo.status === 'active';

        // Create payment record if payment info is provided
        if (subscriptionInfo.paymentInfo) {
          await this.createPaymentRecord(
            subscriptionInfo.paymentInfo.paymentKey,
            userId,
            {
              paymentKey: subscriptionInfo.paymentInfo.paymentKey,
              orderId: subscriptionInfo.paymentInfo.orderId,
              amount: subscriptionInfo.paymentInfo.amount,
              status: subscriptionInfo.paymentInfo.status,
              approvedAt: subscriptionInfo.paymentInfo.approvedAt,
              card: subscriptionInfo.paymentInfo.card,
              orderName: 'Dabini Premium 구독',
              customerKey: userId,
              billingKey,
            },
          );
        }
      }

      return await this.updatePremiumSubscription(userId, subscriptionData);
    } catch (error) {
      throw new Error(
        `Subscription update failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

// Export the class for static usage
export default PremiumSubscriptionService;
