import React from 'react';
import { useForm } from 'react-hook-form';
import "./Shipment.css";

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='shipment-form' onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} placeholder = "Enter your first name" />
      {errors.firstName && <span>First name is required</span>}

      <input {...register("lastName", { required: true })} placeholder = "Enter your last name" />
      {errors.firstName && <span>Last name is required</span>}

      <input {...register("shippingAddress", { required: true })} placeholder = "Type where product will be shipped" />
      {errors.firstName && <span>Type where product will be shipped</span>}

      <input {...register("receiverEmail", { required: true })} placeholder = "Type a valid product receiver email" />
      {errors.firstName && <span>Type a valid product receiver email</span>}
            
      <input type="submit" />
    </form>
  );
};

export default Shipment;