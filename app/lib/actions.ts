'use server';

import Mailjet from 'node-mailjet';

const researchList = '10511517';
const productList = '10511518';

export type ActionState<TState = {}> = TState;

export type ActionResult<TState = {}> = ActionState<TState> & {
  error?: string;
};

export async function subscribeToNewsletter(initialState: ActionState, formData: FormData): Promise<ActionResult> {
  const email = formData.get('email');
  const research = formData.get('research') === 'on';
  const product = formData.get('product') === 'on';

  const client = new Mailjet({ apiKey: process.env.MAILJET_API_KEY!, apiSecret: process.env.MAILJET_API_SECRET! });
  const result = await client
    .post('contact', { version: 'v3' })
    .action('managemanycontacts')
    .request({
      Contacts: [
        {
          Email: email,
        },
      ],
      ContactsLists: [
        {
          ListID: researchList,
          Action: research ? 'addforce' : 'unsub',
        },
        {
          ListID: productList,
          Action: product ? 'addforce' : 'unsub',
        },
      ],
    });

  return initialState;
}
