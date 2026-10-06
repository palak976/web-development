#include <stdio.h>
#include <stdlib.h>

struct DoublyLinkedList
{
    int data;
    struct DoublyLinkedList *prev;
    struct DoublyLinkedList *next;
};

struct DoublyLinkedList *head = NULL;


/* Insert a new node at the beginning */
void insertBeginning(int data)
{
    struct DoublyLinkedList *newNode;

    newNode = (struct DoublyLinkedList *)malloc(
        sizeof(struct DoublyLinkedList));

    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = head;

    if (head != NULL)
    {
        head->prev = newNode;
    }

    head = newNode;
}


/* Insert a new node at the end */
void insertEnd(int data)
{
    struct DoublyLinkedList *newNode;
    struct DoublyLinkedList *current;

    newNode = (struct DoublyLinkedList *)malloc(
        sizeof(struct DoublyLinkedList));

    newNode->data = data;
    newNode->next = NULL;
    newNode->prev = NULL;

    if (head == NULL)
    {
        head = newNode;
        return;
    }

    current = head;

    while (current->next != NULL)
    {
        current = current->next;
    }

    current->next = newNode;
    newNode->prev = current;
}


/* Insert a new node at a given position */
void insertPosition(int data, int position)
{
    struct DoublyLinkedList *newNode;
    struct DoublyLinkedList *current;
    int i;

    newNode = (struct DoublyLinkedList *)malloc(
        sizeof(struct DoublyLinkedList));

    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = NULL;

    /* Insert at beginning */
    if (position == 1)
    {
        newNode->next = head;

        if (head != NULL)
        {
            head->prev = newNode;
        }

        head = newNode;
        return;
    }

    current = head;

    for (i = 1; i < position - 1 && current != NULL; i++)
    {
        current = current->next;
    }

    if (current == NULL)
    {
        printf("Invalid position\n");
        free(newNode);
        return;
    }

    newNode->next = current->next;
    newNode->prev = current;

    if (current->next != NULL)
    {
        current->next->prev = newNode;
    }

    current->next = newNode;
}


/* Delete a node with a given value */
void deleteNode(int value)
{
    struct DoublyLinkedList *current;

    current = head;

    /* Search for the node */
    while (current != NULL && current->data != value)
    {
        current = current->next;
    }

    if (current == NULL)
    {
        printf("Element not found\n");
        return;
    }

    /* If node is the first node */
    if (current->prev == NULL)
    {
        head = current->next;

        if (head != NULL)
        {
            head->prev = NULL;
        }
    }
    else
    {
        current->prev->next = current->next;

        if (current->next != NULL)
        {
            current->next->prev = current->prev;
        }
    }

    free(current);
}


/* Display the doubly linked list */
void display()
{
    struct DoublyLinkedList *current;

    current = head;

    if (current == NULL)
    {
        printf("List is empty\n");
        return;
    }

    printf("Doubly Linked List: ");

    while (current != NULL)
    {
        printf("%d ", current->data);
        current = current->next;
    }

    printf("\n");
}


int main()
{
    insertBeginning(10);
    insertBeginning(20);

    insertEnd(30);
    insertEnd(40);

    insertPosition(25, 3);

    display();

    deleteNode(30);

    display();

    return 0;
}