import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { WishList } from './wishlists/entities/wishlist.entity';
import { Offer } from './offers/entities/offer.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [User, Wish, WishList, Offer],
      synchronize: true, // означает, что при старте приложение будет подгонять базу в СУБД к той, что описана в ORM. Удобно для разработки, но точно не стоит использовать в продакшене, поскольку может привести к неочевидным изменениям и конфликтам при работе нескольких разработчиков.
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    // AuthModule,
  ],
})
export class AppModule {}
