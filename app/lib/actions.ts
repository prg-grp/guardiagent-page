'use server';

import { ContactsApi, CreateContact } from '@getbrevo/brevo';

const productListId = 4;
const researchListId = 3;

export type ActionState<TState = {}> = TState;

export type ActionResult<TState = {}> = ActionState<TState> & {
  error?: string;
};

export async function subscribeToNewsletter(initialState: ActionState, formData: FormData): Promise<ActionResult> {
  const api = new ContactsApi();
  (api as any).authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

  const email = formData.get('email');
  const firstName = formData.get('firstname');
  const lastName = formData.get('lastname');

  if (!email) {
    return { ...initialState, error: 'Please provide a valid email address.' };
  }

  const research = formData.get('research') === 'on';
  const product = formData.get('product') === 'on';

  let call = new CreateContact();
  call.updateEnabled = true;
  call.email = email.toString();
  call.attributes = {
    FIRSTNAME: firstName ? firstName.toString() : undefined,
    LASTNAME: lastName ? lastName.toString() : undefined,
  };
  call.listIds = [];
  if (research) {
    call.listIds.push(researchListId);
  }
  if (product) {
    call.listIds.push(productListId);
  }

  try {
    await api.createContact(call);
    return initialState;
  } catch (e: any) {
    console.error(e);
    return { ...initialState, error: 'Could not add the email address to the contact lists.' };
  }
}
