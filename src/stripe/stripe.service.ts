/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException, Req } from '@nestjs/common';
import {
    BILLING_ACCOUNT_CREATED_CONFLICT,
    BILLING_NOT_FOUND,
    CUSTOMER_NOT_FOUND,
    GROUP_NOT_FOUND,
    INVOICE_NOT_FOUND,
    SOURCE_NOT_FOUND,
    SUBSCRIPTION_NOT_FOUND,
  } from '../errors/errors.constants';
  import {
    CreateBillingDto,
    ReplaceBillingDto,
    UpdateBillingDto,
    CreateProductDto,
    CreatePaymentIntent
  } from './stripe.dto';
import { ConfigService } from '@nestjs/config';
const Stripe = require('stripe')('sk_test_51KvzaTHtdHjiVoi0QYX1X2t6YIWRcxz3BC6tYnQeI9yPKyiINhrz5f4oGioE3wgIDuaXsCB7pGdHlH3J2H56ALkn00j6wgAtzA');
@Injectable()
export class StripeService {
    constructor(
        private configService: ConfigService,
      ) {
       
    }
    async createCustomer(data: CreateBillingDto ) {
        // const group = await this.group.findUnique({
        //   where: { id: groupId },
        //   select: { attributes: true },
        // });
        // if (!group) throw new NotFoundException(GROUP_NOT_FOUND);
        // const attributes = group.attributes as { stripeCustomerId?: string };
        // if (attributes?.stripeCustomerId)
        //   throw new ConflictException(BILLING_ACCOUNT_CREATED_CONFLICT);
        try {
            const newCustomer = await Stripe.customers.create(data);
            if(newCustomer){
                console.log("Customer created successfully")
                return newCustomer  ;
            }
        } catch (error) {
            throw new Error(error)
        }
      
        // await this.prisma.group.update({
        //   where: { id: groupId },
        //   data: { attributes: { stripeCustomerId: result.id } },
        // });     
      }

      async getCustomer(id: string) {
        const result = await Stripe.customers.retrieve(id);
        if (result.deleted) throw new NotFoundException(CUSTOMER_NOT_FOUND);
        return result ;
      }
      async updateCustomer (data: UpdateBillingDto) { 
        const result = await Stripe.customers.update(data);
        return result ;
      }
      async deleteCustomer(id: string) {
        const result = await Stripe.customers.del(
          id,
        );
        return result;
      }
      
      async handleWebhook(
        signature: string
      ) {
     
        const event = Stripe.webhooks.constructEvent(
          signature,
          'whsec_YDTIDlMwgFMXkr1pjLKCTjGK9F5pGx83',
        );
        switch (event.type) {
          case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
          case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            // console.log(`PaymentIntent for ${paymentMethod.amount} was successful!`);
            break;
            case 'price.created':
              const priceCreated = event.data.object;
              console.log(`${priceCreated} is created`);
              // Then define and call a method to handle the successful attachment of a PaymentMethod.
              // handlePaymentMethodAttached(paymentMethod);
              break; 
          default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
        }
      
        return { received: true };
      }
      async createPaymentIntent(data: CreatePaymentIntent){
        try {
          const paymentIntent = await Stripe.paymentIntents.create(data);
          return paymentIntent;
          console.log("OK!")
        } catch (error) {
          console.log(error)
        }
      }
      async retrievePaymentIntent(id: string){
        try {
          const paymentIntent = await Stripe.paymentIntents.retrieve(id);
          return paymentIntent;
        } catch (error) {
          
        }
      }
      async createPaymentMethod(){
        try {
          const paymentMethod = await Stripe.paymentMethods.create({
            type: 'card',
            card: {
              number: '4242424242424242',
              exp_month: 5,
              exp_year: 2023,
              cvc: '314',
            },
          });
          return paymentMethod;
           } catch (error) {   
        }
      }
      async confirmPayment(id: string){
        try {
          const paymentIntent = await Stripe.paymentIntents.confirm(
             id,
             {payment_method: "pm_1KxkcqHtdHjiVoi03yajj2lr"}
          );
          return paymentIntent;
        }catch (error) {

        }
      }
      async cancelPayment(id: string){
        try {
          const paymentIntent = await Stripe.paymentIntents.cancel(
            id
          )
          return paymentIntent;
        } catch (error) {
          
        }
      }
      async getPaymentIntent(){
        try {
          const paymentIntents = await Stripe.paymentIntents.list();
          return paymentIntents;
        } catch (error) {
          
        }
      }
      
      async createSession() {
      const YOUR_DOMAIN = 'http://localhost:3000';
        // const customer = await Stripe.customers.create() 
        // const invoiceItem = await Stripe.invoiceItems.create({
        //     price: priceId,
        //     customer: customer.id
        // })
        const session = await Stripe.checkout.sessions.create({
           mode: "payment",
           payment_method_types: ["card"],
           line_items: [
            {price: 'price_1KxbFvHtdHjiVoi0oKvIQiur', quantity: 1},
          ],
          success_url: `${YOUR_DOMAIN}/success.html`,
          cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });    
        return session;
      }

       async createPaymentIntent1(){
        try {
          return await Stripe.paymentIntents.create({
              payment_method_types: [
                "card"
              ],
              amount: 1120,
              currency: "usd",
              statement_descriptor: "dsadasda",
              customer: "cus_LdOeHHQGA3hCkh",
              description: "Hi "
          })
        }
        catch (err) {
          console.log(err.type)
          return err;
        }
      }
      async createProduct(name: string){
        try {
          const product = await Stripe.products.create(name);
          return product; 
        }catch (err) {
          return err;
        }      
      }

      async createPrice(){
        try {
          return await Stripe.prices.create({
            unit_amount: 2000,
            currency: 'usd',
            recurring: {interval: 'month'},
            product: "prod_LfScty5RIYfAli",
          });
           
        } catch (error) {
          console.log(error);
        }  
      }
      
      async createSubscription(){
        try {
      
          const subscription = await Stripe.subscriptions.create({
            customer: "cus_LdeMvtgZSOF0Wb",
            items: [
              {price: "price_1KxpG7HtdHjiVoi0fW9l6INm"},
            ],
          });
          return  subscription;
        } catch (e) {   
          switch (e.type) {
            case 'StripeCardError':
              console.log(`A payment error occurred: ${e.message}`);
              break;
            case 'StripeInvalidRequestError':
              console.log('An invalid request occurred.');
              break;
            default:
              console.log('Another problem occurred, maybe unrelated to Stripe.');
              break;
          }
        }
      }
      async createSubscription1(data: CreateBillingDto, name: string){
        try {
          const newCustomer =  await this.createCustomer(data);
          const product = await Stripe.products.list(data);
          const productId = product.filter(products => products == product.id);
          if(productId !== product.id){
            var newProduct = await this.createProduct(name);
          }
          const price = await Stripe.prices.create({
            unit_amount: 2000,
            currency: 'usd',
            recurring: {interval: 'month'},
            product: newProduct.id,
          });
          
          const subscription = await Stripe.subscriptions.create({
            customer: newCustomer.id,
            items: [
              {price: price.id},
            ],
          });
          return  subscription;
        } catch (e) {   
          switch (e.type) {
            case 'StripeCardError':
              console.log(`A payment error occurred: ${e.message}`);
              break;
            case 'StripeInvalidRequestError':
              console.log('An invalid request occurred.');
              break;
            default:
              console.log('Another problem occurred, maybe unrelated to Stripe.');
              break;
          }
        }
      }
      async createWebhookEndpoint() {
        try {
          const webhookEndpoint = await Stripe.webhookEndpoints.create({
            url: 'https://webhook.site/5c700154-721d-48a9-97da-b6c823aead5c',
            enabled_events: [
              'payment_intent.succeeded',
              'price.created',
              'customer.created',
              'customer.subscription.created'
            ],
          });
          return webhookEndpoint;
        } catch (error) {
          return error;
        }
      }
      async createCoupon(){
        try {
          const coupon = await Stripe.coupons.create({
            percent_off:50,
            duration: 'repeating',
            duration_in_months: 3,
            id: "EKOIOS",

          });
          return coupon;
        } catch (error) {
          
        }
      }
     
      // async getSubscription(
      //   subscriptionId: string,
      // ){
      //   const stripeId = await this.stripeId(groupId);
      //   const result = await this.stripe.subscriptions.retrieve(subscriptionId);
      //   if (result.customer !== stripeId)
      //     throw new NotFoundException(SUBSCRIPTION_NOT_FOUND);
      //   return result;
      // }
}
