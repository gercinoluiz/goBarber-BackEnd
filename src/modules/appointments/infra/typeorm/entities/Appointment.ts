import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import User from "@modules/users/infra/typeorm/entities/User";
import { Expose } from 'class-transformer';


@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })   // The relational thing
    provider: User

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'user_id'
    })
    user: User   // Try to understand the reason of this line



    @Column('time with time zone')
    date: Date;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}
export default Appointment;
