/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateProductDto, CreatePaymentIntent } from './stripe.dto';

@Controller('products')
export class ProductController {
  constructor(private stripeService: StripeService) {}
  //Payment-intents
  @Post('payment-intents')
  async createPaymentIntent(@Body() data: CreatePaymentIntent) {
    return this.stripeService.createPaymentIntent(data);
  }
  @Get('payment-intents/:id')
  async retrievePaymentIntent(@Param() id: string) {
    return this.stripeService.retrievePaymentIntent(id);
  }
  @Get('payment-intents/:id/confirm')
  async confirmPayment(@Param() id: string) {
    return this.stripeService.confirmPayment(id);
  }
  @Get('payment-intents/:id/cancel')
  async cancelPayment(@Param() id: string){
    return this.stripeService.cancelPayment(id);
  }
  @Get()
  async getPaymentIntent(){
    return this.stripeService.getPaymentIntent();
  }
  @Post('payment')
  async createPaymentMethod(){
    return this.stripeService.createPaymentMethod();
  }

  @Post('/payment1')
    async createPaymentMethod1(){
      return this.stripeService.createPaymentIntent1();
    }

    @Post('createProduct')
    async createProduct(@Body() name: string) {
      return this.stripeService.createProduct(name);
    }
    @Post('createPrice')
    async createPrice() {
      return this.stripeService.createPrice();
    }
    @Post('createCoupon')
    async createCoupon() {
      return this.stripeService.createCoupon();
    }

  }
