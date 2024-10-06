import { useLoaderData, json } from '@remix-run/react';
import { Page, BlockStack, InlineGrid, Text, Box, TextField, Card, Button, Form} from '@shopify/polaris';
import { title } from 'process';
import { useState } from 'react';

export async function loader() {
  // provides data to the component
  return json ({ title: 'Some data', description: 'Product are selling'});
}

export async function action({request}) {
  // updates persistent data
  let settings = await request.formData();
  return json({
    settings
  })
}
function Settings() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);
  console.log(settings);
  return (
    <Page
      divider
    >
      <ui-title-bar title="Settings"></ui-title-bar>
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Title
              </Text>
              <Text as="p" variant="bodyMd">
                Description
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <Form method='POST'>
              <TextField label="Title" name='title' value={formState?.title} onChange={(value)=> setFormState({...formState, title:value})}/>
              <TextField label="Description"  value={formState?.description} onChange={(value)=> setFormState({...formState, description:value})}/>
              <Button submit={true}>Save Data</Button>
              </Form>
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  )
}

export default Settings;