// import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import Stripe from 'stripe';
// import StripeError from './stripeError.enum';
// @Injectable()
// export class StripePaymentService {
//   private stripe: Stripe;
 
//   constructor(
//     private configService: ConfigService
//   ) {
//     this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
//       apiVersion: '2020-08-27',
//     });
//   }
 
//   public async setDefaultCreditCard(paymentMethodId: string, customerId: string) {
//     try {
//       return await this.stripe.customers.update(customerId, {
//         invoice_settings: {
//           default_payment_method: paymentMethodId
//         }
//       })
//     } catch (error) {
//       if (error?.type === StripeError.InvalidRequest) {
//         throw new BadRequestException('Wrong credit card chosen');
//       }
//       throw new InternalServerErrorException();
//     }
//   }
//   public async createSubscription(priceId: string, customerId: string,) {
//     try {
//       return await this.stripe.subscriptions.create({
//         customer: customerId,
//         items: [
//           {
//             price: priceId
//           }
//         ]
//       })
//     } catch (error) {
//       if (error?.code === StripeError.ResourceMissing) {
//         throw new BadRequestException('Credit card not set up');
//       }
//       throw new InternalServerErrorException();
//     }
//   }
 
//   public async listSubscriptions(priceId: string, customerId: string,) {
//     return this.stripe.subscriptions.list({
//       customer: customerId,
//       price: priceId
//     })
//   }
// }
