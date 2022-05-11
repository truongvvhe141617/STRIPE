// import { StripePaymentService } from './stripe-payment.service';
// import { Body, Controller, Post, Req, UseGuards, Get, HttpCode } from '@nestjs/common';
// // import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
// // import RequestWithUser from '../authentication/requestWithUser.interface';
// import SetDefaultCreditCardDto from './setDefaultCreditCard.dto';
// import RequestWithUser from './authentication/requestWithUser.interface';
 
// @Controller('credit-cards')
// export default class CreditCardsController {
//   constructor(
//     private readonly stripeService: StripePaymentService
//   ) {}
 
//   @Post('default')
//   @HttpCode(200)
//   async setDefaultCard(@Body() creditCard: SetDefaultCreditCardDto, @Req() request: RequestWithUser) {
//     await this.stripeService.setDefaultCreditCard(creditCard.paymentMethodId, request.user.stripeCustomerId);
//   }
 
//   // ...
// }