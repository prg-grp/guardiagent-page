'use server';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email');
  const research = formData.get('research') === 'on';
  const product = formData.get('product') === 'on';

  console.log({ email, research, product });
}
