<template>
  <h2>Registration Form</h2>
  <form class="greetings">
    <label for="email"><b>Email</b></label
    ><br />
    <input name="email" type="email" v-model="email" @blur="v$.email.$touch" />
    <br />
    <div v-if="v$.email.$error">Email field has an error.</div>

    <label for="password"><b>Password</b></label
    ><br />
    <input
      name="password"
      type="password"
      v-model="password"
      @blur="v$.password.$touch"
    />
    <br />
    <div v-if="v$.password.minLength.$invalid">Password is too short.</div>
    <div v-if="v$.password.containsUppercase.$invalid">
      Password does not contain upper case letter.
    </div>
    <div v-if="v$.password.containsLowercase.$invalid">
      Password does not contain lower case letter.
    </div>
    <div v-if="v$.password.containsNumber.$invalid">
      Password does not contain number.
    </div>

    <label for="passwordConfirm"><b>Password Confirm</b></label
    ><br />
    <input
      name="passwordConfirm"
      type="password"
      v-model="passwordConfirm"
      @blur="v$.passwordConfirm.$touch"
    />
    <br />
    <div v-if="v$.passwordConfirm.$error">Password are not same.</div>
    <button :disabled="v$.$invalid" type="submit">Register</button>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },

  validations() {
    return {
      email: { required, email, $lazy: true },
      password: {
        $lazy: true,
        required,
        minLength: minLength(8),
        containsUppercase: function (value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value);
        },
      },
      passwordConfirm: { required, sameAsPassword: sameAs(this.password) },
    };
  },
};
</script>
